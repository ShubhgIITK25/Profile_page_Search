"use client"

import { useEffect, useMemo, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

type ChatMessage = {
	id: number
	role: "user" | "assistant"
	content: string
}

type ChatSession = {
	id: number
	title: string
	messages: ChatMessage[]
	updatedAt: number
}

const SESSION_STORAGE_KEY = "chatgupta-session-history"

function createSession(initialPrompt?: string): ChatSession {
	const now = Date.now()
	const title = initialPrompt?.trim() ? initialPrompt.trim().slice(0, 48) : "New chat"

	return {
		id: now,
		title,
		messages: [],
		updatedAt: now,
	}
}

export default function ChatGuptaPage() {
	const [prompt, setPrompt] = useState("")
	const messagesContainerRef = useRef<HTMLDivElement | null>(null)
	const [chatSessions, setChatSessions] = useState<ChatSession[]>(() => {
		if (typeof window === "undefined") {
			return [createSession()]
		}

		const raw = sessionStorage.getItem(SESSION_STORAGE_KEY)
		if (!raw) {
			return [createSession()]
		}

		try {
			const parsed = JSON.parse(raw) as ChatSession[]
			if (Array.isArray(parsed) && parsed.length > 0) {
				return parsed
			}
		} catch {
			// Ignore broken session data and fall back to a fresh session.
		}

		return [createSession()]
	})
	const [activeSessionId, setActiveSessionId] = useState<number | null>(() => {
		if (typeof window === "undefined") {
			return null
		}

		const raw = sessionStorage.getItem(SESSION_STORAGE_KEY)
		if (!raw) {
			return null
		}

		try {
			const parsed = JSON.parse(raw) as ChatSession[]
			if (Array.isArray(parsed) && parsed.length > 0) {
				return parsed[0].id
			}
		} catch {
			return null
		}

		return null
	})

	useEffect(() => {
		sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(chatSessions))
	}, [chatSessions])

	const resolvedActiveSessionId = activeSessionId ?? chatSessions[0]?.id ?? null

	const activeSession = useMemo(() => {
		if (resolvedActiveSessionId === null) {
			return null
		}

		return chatSessions.find((session) => session.id === resolvedActiveSessionId) ?? null
	}, [resolvedActiveSessionId, chatSessions])

	const sortedSessions = useMemo(() => {
		return [...chatSessions].sort((a, b) => b.updatedAt - a.updatedAt)
	}, [chatSessions])

	useEffect(() => {
		const container = messagesContainerRef.current
		if (!container || resolvedActiveSessionId === null) {
			return
		}

		container.scrollTo({
			top: container.scrollHeight,
			behavior: "smooth",
		})
	}, [activeSession?.messages.length, resolvedActiveSessionId])

	const hasHistory = sortedSessions.length > 0

	const createNewSession = () => {
		const freshSession = createSession()
		setChatSessions((current) => [freshSession, ...current])
		setActiveSessionId(freshSession.id)
	}

	const deleteSession = (sessionId: number) => {
		setChatSessions((current) => {
			const filtered = current.filter((item) => item.id !== sessionId)

			if (filtered.length === 0) {
				const fresh = createSession()
				setActiveSessionId(fresh.id)
				return [fresh]
			}

			if (resolvedActiveSessionId === sessionId) {
				setActiveSessionId(filtered[0].id)
			}

			return filtered
		})
	}

	const handleSend = () => {
		if (!activeSession) {
			return
		}

		const trimmedPrompt = prompt.trim()

		if (!trimmedPrompt) {
			return
		}

		const userMessage: ChatMessage = {
			id: Date.now(),
			role: "user",
			content: trimmedPrompt,
		}

		const assistantMessage: ChatMessage = {
			id: Date.now() + 1,
			role: "assistant",
			content: `I received: "${trimmedPrompt}". Connect your backend response stream here for live ChatGPT-style replies.`,
		}

		setChatSessions((current) =>
			current.map((session) => {
				if (session.id !== activeSession.id) {
					return session
				}

				const updatedMessages = [...session.messages, userMessage, assistantMessage]
				const updatedTitle =
					session.title === "New chat" ? trimmedPrompt.slice(0, 48) : session.title

				return {
					...session,
					title: updatedTitle,
					messages: updatedMessages,
					updatedAt: Date.now(),
				}
			})
		)
		setPrompt("")
	}

	if (!activeSession) {
		return (
			<main className="min-h-screen bg-slate-100 px-4 py-8">
				<div className="mx-auto w-full max-w-6xl rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
					Loading chat...
				</div>
			</main>
		)
	}

	return (
		<main className="min-h-screen bg-slate-100 px-4 py-8">
			<div className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-[280px_1fr]">
				<aside className="hidden h-[78vh] rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:block">
					<div className="mb-3 flex items-center justify-between">
						<h2 className="text-lg font-semibold text-slate-900">Chat History</h2>
						<Button size="sm" variant="outline" onClick={createNewSession}>
							New
						</Button>
					</div>
					{hasHistory ? (
						<div className="h-[calc(78vh-4.5rem)] space-y-2 overflow-y-auto pr-1">
							{sortedSessions.map((session) => (
								<div
									key={session.id}
									className="flex items-center gap-2 rounded-lg border border-slate-200 p-2"
								>
									<button
										type="button"
										onClick={() => setActiveSessionId(session.id)}
										className={`flex-1 rounded-md px-2 py-1 text-left text-sm ${
											resolvedActiveSessionId === session.id
												? "bg-slate-900 text-white"
												: "text-slate-700 hover:bg-slate-100"
										}`}
									>
										{session.title || "New chat"}
									</button>
									<Button
										type="button"
										variant="ghost"
										size="xs"
										onClick={() => deleteSession(session.id)}
									>
										Delete
									</Button>
								</div>
							))}
						</div>
					) : (
						<p className="text-sm text-slate-500">No chats yet. Your chat history will appear here.</p>
					)}
				</aside>

				<section className="flex h-[78vh] min-h-0 flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
					<div className="flex w-full items-center justify-between md:hidden">
						<h2 className="text-lg font-semibold text-slate-900">Chat</h2>
						<Dialog>
							<DialogTrigger asChild>
								<Button variant="outline">History</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Chat History</DialogTitle>
									<DialogDescription>Recent prompts sent in this session.</DialogDescription>
								</DialogHeader>
								<Button size="sm" variant="outline" onClick={createNewSession}>
									New chat
								</Button>
								{hasHistory ? (
									<div className="max-h-80 space-y-2 overflow-auto">
										{sortedSessions.map((session) => (
											<div key={session.id} className="flex items-center gap-2 rounded-lg border border-slate-200 p-2">
												<DialogClose asChild>
													<button
														type="button"
														onClick={() => setActiveSessionId(session.id)}
														className="flex-1 rounded-md px-2 py-1 text-left text-sm text-slate-700 hover:bg-slate-100"
													>
														{session.title || "New chat"}
													</button>
												</DialogClose>
												<Button
													type="button"
													variant="ghost"
													size="xs"
													onClick={() => deleteSession(session.id)}
												>
													Delete
												</Button>
											</div>
										))}
									</div>
								) : (
									<p className="text-sm text-slate-500">No chats yet. Your chat history will appear here.</p>
								)}
								<DialogFooter showCloseButton />
							</DialogContent>
						</Dialog>
					</div>

					<div
						ref={messagesContainerRef}
						className="mt-3 min-h-0 flex-1 space-y-4 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-4"
					>
						{activeSession.messages.length > 0 ? (
							activeSession.messages.map((message) => (
								<div
									key={message.id}
									className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
								>
									<div
										className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
											message.role === "user"
												? "bg-slate-900 text-white"
												: "bg-white text-slate-800 border border-slate-200"
										}`}
									>
										{message.content}
									</div>
								</div>
							))
						) : (
							<div className="flex h-full min-h-52 items-center justify-center text-center text-sm text-slate-500">
								Start the conversation by sending a message below.
							</div>
						)}
					</div>

					<div className="mt-4 flex w-full gap-2">
						<Input
							placeholder="Ask something..."
							value={prompt}
							className="h-10"
							onChange={(event) => setPrompt(event.target.value)}
							onKeyDown={(event) => {
								if (event.key === "Enter") {
									event.preventDefault()
									handleSend()
								}
							}}
						/>
						<Button className="h-10" onClick={handleSend}>
							Send
						</Button>
					</div>
				</section>
			</div>
		</main>
	)
}
