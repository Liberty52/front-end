import './SocialLoginButton.css'

export default function  SocialLoginButton({provider}){
    return <>
        <button className={`social_login_button ${provider.css}`}>
                <a href={provider.url}>{provider.text}</a>
        </button>
    </>
}