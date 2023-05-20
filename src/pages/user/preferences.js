import axios from "axios";
import { useEffect, useState } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import Loader from "@/components/UI/Loader";
import Message from "@/components/UI/Message";
import OptionSelection from "@/components/preferences/OptionSelection";

const Preferences = () => {
    const [sources, setSources] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedSources, setSelectedSources] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [message, setMessage] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get(process.env.NEXT_PUBLIC_BASE_URL + "/news/preferences")
            .then((res) => {
                const preferences = res.data;

                if (preferences.preferred_sources)
                    setSelectedSources(preferences.preferred_sources);

                if (preferences.preferred_categories)
                    setSelectedCategories(preferences.preferred_categories);

                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err.response);
            });

        axios
            .get(process.env.NEXT_PUBLIC_BASE_URL + "/news/preferences/options")
            .then((res) => {
                const options = res.data;
                setSources(options.sources);
                setCategories(options.categories);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    const handleSourceSelectionChange = (option, isSelected) => {
        isSelected
            ? setSelectedSources([...selectedSources, option])
            : setSelectedSources(selectedSources.filter((o) => o !== option));
    };

    const handleCategorySelectionChange = (option, isSelected) => {
        isSelected
            ? setSelectedCategories([...selectedCategories, option])
            : setSelectedCategories(
                  selectedCategories.filter((o) => o !== option)
              );
    };

    const handleFormSubmit = () => {
        axios
            .post(process.env.NEXT_PUBLIC_BASE_URL + "/news/preferences/save", {
                preferred_sources: selectedSources,
                preferred_categories: selectedCategories,
            })
            .then((res) => {
                setMessage({
                    text: "Your preferences have been saved successfully ✅",
                    type: "success",
                });
            })
            .catch((err) => {
                console.log(err.response);

                setMessage({
                    text: "Sorry something went wrong while saving your preferences ❌",
                    type: "failure",
                });
            });

        setTimeout(() => {
            setMessage({});
        }, 3000);
    };

    const preferencesView = (
        <div className="m-5">
            <OptionSelection
                options={categories}
                oldOptions={selectedCategories}
                type="categories"
                onSelectionChange={handleCategorySelectionChange}
            />
            <hr />
            <OptionSelection
                options={sources}
                oldOptions={selectedSources}
                type="sources"
                onSelectionChange={handleSourceSelectionChange}
            />
            <hr />

            {message.text && (
                <Message type={message.type} text={message.text} />
            )}

            <button
                className="my-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleFormSubmit}
            >
                Save
            </button>
        </div>
    );

    return <AuthLayout>{isLoading ? <Loader /> : preferencesView}</AuthLayout>;
};

export default Preferences;
