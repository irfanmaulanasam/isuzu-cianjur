import Script from "next/script";

export default function ChatWidget(params) {
    return(
        <Script
          strategy="afterInteractive"
          src="https://embed.tawk.to/692ea35daa4e83197c30b744/1jbf2s9tn"
        />
    )
}