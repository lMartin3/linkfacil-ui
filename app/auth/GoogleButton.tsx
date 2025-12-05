
export function GoogleButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="flex w-full items-center justify-center space-x-2 rounded-md border px-3 py-2 text-sm
                 transition hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <svg
                className="h-5 w-5"
                viewBox="0 0 48 48"
            >
                <path fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.19 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.67 13.83 17.9 9.5 24 9.5z"/>
                <path fill="#4285F4"
                      d="M46.1 24.55c0-1.56-.14-3.06-.41-4.5H24v9.02h12.6c-.54 2.89-2.18 5.34-4.65 6.98l7.12 5.49C43.59 37.51 46.1 31.47 46.1 24.55z"/>
                <path fill="#FBBC05"
                      d="M10.54 28.03C9.88 26.1 9.5 24.08 9.5 22c0-2.08.38-4.1 1.05-6.03L2.56 9.78C.88 13.22 0 17.46 0 22c0 4.54.88 8.78 2.56 12.22l7.98-6.19z"/>
                <path fill="#34A853"
                      d="M24 44c6.47 0 11.9-2.19 15.79-5.78l-7.12-5.49c-2.14 1.43-4.88 2.27-8.67 2.27-6.1 0-11.33-4.33-13.46-10.03l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            <span>Sign in with Google</span>
        </button>
    )
}