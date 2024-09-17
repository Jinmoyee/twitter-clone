import { TwitterTimelineEmbed, TwitterTweetEmbed } from "react-twitter-embed";
import { FaSearch } from "react-icons/fa";
export default function RightPanel() {

    return (
        <div className="p-3 hidden md:inline">
            <div className="flex items-center relative">
                <FaSearch className="text-xl absolute top-3 right-3" />
                <input placeholder="Search Twitter" type="text" className="px-3 py-2 rounded-full border-2 w-full" />
            </div>
            <div className="mt-2 bg-slate-200 p-3 rounded-2xl">
                <h2 className="text-xl font-bold">What's Happening</h2>
                <TwitterTweetEmbed tweetId={"1816174440071241866"} />
                <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName="Valorant"
                    options={{ height: 400 }}
                />
            </div>
        </div>
    )
}
