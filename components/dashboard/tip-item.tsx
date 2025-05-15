export function TipItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="p-1 bg-yellow-500/20 rounded-full">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-yellow-400"
        >
          <path
            d="M9 12L11 14L15 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="text-sm text-gray-300">{text}</span>
    </div>
  )
}
