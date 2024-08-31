export default function PersonalTags () {
    const tags = [
        {tagName: '#webdev'},
        {tagName: '#javascript'},
        {tagName: '#beginners'},
        {tagName: '#react'},
        {tagName: '#python'},
        {tagName: '#productivity'},
        {tagName: '#aws'},
        {tagName: '#typescript'},
        {tagName: '#css'},
        {tagName: '#java'},
        {tagName: '#linux'},
        {tagName: '#database'},
        {tagName: '#php'},
        {tagName: '#git'},
        {tagName: '#sql'},
        {tagName: '#vscode'},
        {tagName: '#ubuntu'},
        {tagName: '#npm'},
    ];
    
    return (
        <>
            {
                tags.map((tag,index) => {
                    return (
                    <button key={index} className="text-left hover:bg-indigo-100 hover:text-[#3B49DF] hover:underline p-4 rounded-lg mb-2 w-full">
                        <p className="text-2xl text-gray-700 hover:text-[#3B49DF]">{tag.tagName}</p>
                    </button>
                    );
                })
            }
        </>
    )
}