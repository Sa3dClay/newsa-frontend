const ArticleFilters = ({ sources, categories, onFilterChange }) => {
    return (
        <div className="text-center">
            <h2 className="text-indigo-500 text-xl my-4 font-bold">Filters</h2>
            {/* sources filter */}
            <select onChange={(e) => onFilterChange("source", e.target.value)}>
                <option value="">All Sources</option>
                {sources.map((source) => (
                    <option key={source} value={source}>
                        {source}
                    </option>
                ))}
            </select>

            {/* from date filter */}
            <div className="my-4">
                <label htmlFor="fromDate">From Date:</label>
                <input
                    type="date"
                    id="fromDate"
                    onChange={(e) =>
                        onFilterChange("from_date", e.target.value)
                    }
                />
            </div>
            {/* to date filter */}
            <div className="my-4">
                <label htmlFor="toDate">To Date:</label>
                <input
                    type="date"
                    id="toDate"
                    onChange={(e) => onFilterChange("to_date", e.target.value)}
                />
            </div>
        </div>
    );
};

export default ArticleFilters;
