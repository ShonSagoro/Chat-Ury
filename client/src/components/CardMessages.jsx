import { UseChat } from "../context/ChatProvider";
import { UseUser } from "../context/UserProvider";
import RenderImage from "./RenderImage";


function CardMessages(props) {
  const { user } = UseUser();
  const { conversation } = UseChat();

  return (
    <>
      <ul className=" w-auto overflow-y-auto flex flex-col-reverse h-4/5 my-2">
        {props.messages.map((message, index) => {
          if (
            (message.to == "general" && conversation.to.id == "general") ||
            message.from == "me"
          ) {
            if (message.type == "file") {
              const blob = new Blob([message.file], {
                type: message.type,
              });
              return (
                <li
                  className={`my-2 p-2 rounded-md table ${
                    message.from == "me"
                      ? "bg-pink-500 ml-auto"
                      : "bg-slate-700 mr-auto"
                  }`}
                >
                  <div key={index}>
                    <RenderImage fileName={message.fileName} blob={blob} />
                    <p>
                      {message.body != ""
                        ? `${message.from}: ${message.body}`
                        : `${message.from}:`}
                    </p>
                  </div>
                </li>
              );
            }
            return (
              <li
                className={`my-2 p-2 rounded-md table ${
                  message.from == "me"
                    ? "bg-pink-500 ml-auto"
                    : "bg-slate-700 mr-auto"
                }`}
              >
                <div key={index}>
                  <p>
                    {message.from}: {message.body}
                  </p>
                </div>
              </li>
            );
          } else if (
            (message.to == user.id &&
              message.from == conversation.to.username) ||
            message.from == "me"
          ) {
            if (message.type == "file") {
              const blob = new Blob([message.file], {
                type: message.type,
              });
              return (
                <li
                  className={`my-2 p-2 rounded-md table ${
                    message.from == "me"
                      ? "bg-pink-500 ml-auto"
                      : "bg-slate-700 mr-auto"
                  }`}
                >
                  <div key={index}>
                    <RenderImage fileName={message.fileName} blob={blob} />
                    <p>
                      {message.body != ""
                        ? `${message.from}: ${message.body}`
                        : `${message.from}:`}
                    </p>
                  </div>
                </li>
              );
            }
            return (
              <li
                className={`my-2 p-2 rounded-md table ${
                  message.from == "me"
                    ? "bg-pink-500 ml-auto"
                    : "bg-slate-700 mr-auto"
                }`}
              >
                <div key={index}>
                  <p>
                    {message.from}: {message.body}
                  </p>
                </div>
              </li>
            );
          }
        })}
      </ul>
    </>
  );
}

export default CardMessages;
