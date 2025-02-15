import type { UUID, Character } from "@elizaos/core";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

const fetcher = async ({
    url,
    method,
    body,
    headers,
}: {
    url: string;
    method?: "GET" | "POST";
    body?: object | FormData;
    headers?: HeadersInit;
}) => {
    const options: RequestInit = {
        method: method ?? "GET",
        headers: headers
            ? headers
            : {
                  Accept: "application/json",
                  "Content-Type": "application/json",
              },
    };

    if (method === "POST") {
        if (body instanceof FormData) {
            if (options.headers && typeof options.headers === 'object') {
                // Create new headers object without Content-Type
                options.headers = Object.fromEntries(
                    Object.entries(options.headers as Record<string, string>)
                        .filter(([key]) => key !== 'Content-Type')
                );
            }
            options.body = body;
        } else {
            options.body = JSON.stringify(body);
        }
    }

    return fetch(`${BASE_URL}${url}`, options).then(async (resp) => {
        const contentType = resp.headers.get('Content-Type');
        if (contentType === "audio/mpeg") {
            return await resp.blob();
        }

        if (!resp.ok) {
            const errorText = await resp.text();
            console.error("Error: ", errorText);

            let errorMessage = "An error occurred.";
            try {
                const errorObj = JSON.parse(errorText);
                errorMessage = errorObj.message || errorMessage;
            } catch {
                errorMessage = errorText || errorMessage;
            }

            throw new Error(errorMessage);
        }
            
        return resp.json();
    });
};

export const apiClient = {
    sendMessage: async (
        botId: string,
        message: string,
        selectedFile?: File | null
    ) => {
        const formData = new FormData();
        formData.append("text", message);
        formData.append("user", "user");

        if (selectedFile) {
            formData.append("file", selectedFile);
        }
        const resp = await fetcher({
            url: `/bots/${botId}/messages`,
            method: "POST",
            body: formData,
        });

        return resp.data;
    },
    getBotMessages: async (botId: string, since?: number) => {
        const url = since 
            ? `/bots/${botId}/messages?since=${since}`
            : `/bots/${botId}/messages`;
        const resp = await fetcher({ url });
        return resp.data;
    },
    subscribeToBotEvents: (
        botId: string,
        handlers: {
            onMessage: (data: unknown) => void;
            onHeartbeat?: (timestamp: number) => void;
            onConnected?: (data: unknown) => void;
            onError?: (error: Event) => void;
        }
    ) => {
        const eventSource = new EventSource(`${BASE_URL}/bots/${botId}/events`);

        eventSource.addEventListener('message', (event) => {
            try {
                const data = JSON.parse(event.data);
                handlers.onMessage(data);
            } catch (error) {
                console.error('Error parsing message event data:', error);
            }
        });

        eventSource.addEventListener('heartbeat', (event) => {
            handlers.onHeartbeat?.(Number(event.data));
        });

        eventSource.addEventListener('connected', (event) => {
            try {
                const data = JSON.parse(event.data);
                handlers.onConnected?.(data);
            } catch (error) {
                console.error('Error parsing connected event data:', error);
            }
        });

        eventSource.onerror = (error) => {
            handlers.onError?.(error);
            eventSource.close();
        };

        return () => eventSource.close();
    },
    getBots: () => fetcher({ url: "/bots" }),
    getBot: (botId: string): Promise<{ id: UUID; character: Character }> =>
        fetcher({ url: `/bots/${botId}` }),
    tts: (agentId: string, text: string) =>
        fetcher({
            url: `/${agentId}/tts`,
            method: "POST",
            body: {
                text,
            },
            headers: {
                "Content-Type": "application/json",
                Accept: "audio/mpeg",
                "Transfer-Encoding": "chunked",
            },
        }),
    whisper: async (agentId: string, audioBlob: Blob) => {
        const formData = new FormData();
        formData.append("file", audioBlob, "recording.wav");
        return fetcher({
            url: `/${agentId}/whisper`,
            method: "POST",
            body: formData,
        });
    },
};
