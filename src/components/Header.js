import Head from "next/head";

const Header = () => {
    return (
        <Head>
            <title>NEWSA</title>
            <meta name="description" content="Follow World News" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
};

export default Header;
