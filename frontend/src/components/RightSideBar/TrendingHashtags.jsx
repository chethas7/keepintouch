import { trendingHashtags } from "../../assets/dummyData";

const TrendingHashtags = () => {
  return (
    <div className="bg-gray-100 dark:bg-[#1f1f1f] rounded-xl p-4 shadow-sm">
      <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200">
        Trending
      </h3>

      <div className="space-y-2">
        {trendingHashtags.slice(0, 5).map((tag) => (
          <p
            key={tag.tag}
            className="text-sm text-blue-500 cursor-pointer hover:underline"
          >
            {tag.tag}
          </p>
        ))}
      </div>
    </div>
  );
};

export default TrendingHashtags;
