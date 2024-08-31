export default function SocialMedia () {
    const networks = [
        {img: '/twitterBlack.svg'},
        {img: '/facebookBlack.svg'},
        {img: '/githubBlack.svg'},
        {img: '/instagramBlack.svg'},
        {img: '/twich.svg'},
        {img: '/mastodon.svg'},
    ];

    return (
        <>
            {
                networks.map((icono,index) => {
                    return (
                    <button key={index} className="text-left text-black hover:bg-indigo-200 hover:text-[#3B49DF] hover:underline p-3 rounded-lg mb-2">
                        <img src={icono.img} alt="socialMedia" className="w-[25px] h-[25px]"/>
                    </button>
                    );
                })
            }
        </>
    )
}