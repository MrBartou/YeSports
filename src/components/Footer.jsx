import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="bg-white rounded-lg dark:bg-gray-900 mt-4">
            <div className="w-full max-w-screen-xl mx-auto pt-4">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">YeSport</span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <Link to={"/"} className="hover:underline me-4 md:me-6">{t("home")}</Link>
                        </li>
                        <li>
                            <Link to={"/contact"} className="hover:underline">{t("contact")}</Link>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400 hover:underline">© 2024 <a href="https://flowbite.com/">YeSport</a>. {t("footer__rights")}.</span>
            </div>
        </footer>
    )
}

export default Footer;