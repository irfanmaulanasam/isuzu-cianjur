import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
export default function GlobalLayer(){
    return(
        <div>
            <SpeedInsights/>
            <Analytics/>
        </div>
    )
}