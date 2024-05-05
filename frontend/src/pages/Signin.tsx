import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const Signin = ()=>{
    return <div>
        <div className="grid grid-cols-2">
            <div className="invisible lg:visible">
                <Quote />
            </div>  
            <div>
                <Auth type={"signin"} />
            </div>
        </div>
    </div>
}
