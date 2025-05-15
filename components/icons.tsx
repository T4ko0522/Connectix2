import type React from "react"
import Image from "next/image"

export function GoogleIcon(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center ${props.className || ""}`}
      style={{ width: "18px", height: "18px" }}
    >
      <Image src="/google-icon.png" alt="Google" width={18} height={18} style={{ objectFit: "contain" }} />
    </div>
  )
}

export function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.581 9.521 21.278 9.521 21.017C9.521 20.782 9.512 20.082 9.508 19.212C6.726 19.859 6.139 17.777 6.139 17.777C5.685 16.598 5.029 16.296 5.029 16.296C4.132 15.65 5.097 15.663 5.097 15.663C6.094 15.734 6.628 16.714 6.628 16.714C7.521 18.262 8.97 17.824 9.539 17.572C9.63 16.932 9.889 16.494 10.175 16.252C7.954 16.007 5.62 15.152 5.62 11.294C5.62 10.166 6.01 9.247 6.649 8.532C6.546 8.283 6.203 7.283 6.747 5.964C6.747 5.964 7.587 5.699 9.497 6.932C10.3 6.715 11.15 6.607 12 6.603C12.85 6.607 13.7 6.715 14.503 6.932C16.413 5.699 17.253 5.964 17.253 5.964C17.797 7.283 17.454 8.283 17.351 8.532C17.99 9.247 18.38 10.166 18.38 11.294C18.38 15.162 16.043 16.004 13.815 16.245C14.172 16.543 14.498 17.139 14.498 18.044C14.498 19.34 14.486 20.69 14.486 21.017C14.486 21.28 14.666 21.586 15.176 21.486C19.146 20.161 22 16.415 22 12C22 6.477 17.523 2 12 2Z"
        fill="currentColor"
      />
    </svg>
  )
}
