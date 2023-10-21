import './Message.css'

export default function Message ({children}) {
  return (<div className="message">
    {children}
  </div>)
}