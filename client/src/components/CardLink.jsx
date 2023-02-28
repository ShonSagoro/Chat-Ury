import {Link} from "react-router-dom"

function CardLink(props) {
    return ( 
        <>
            <Link to={props.url} className="h-full w-3/6 bg-zinc-900 rounded-lg p-2 mx-6">
                <div className="flex flex-col h-full w-full items-stretch">
                    <img src={props.img} className=" my-20 w-96 self-center"></img>
                    <p className="font-medium text-5xl text-center mt-10">{props.name}</p>
                </div>
            </Link>
        </>
     );
}

export default CardLink;