import Breadcrumb from "./Breadcrumb";
import PropTypes from "prop-types";

function Header({ title, breadcrumbItems }) {
    return (
        <>
            <h1 className="mb-4 text-3xl tracking-tight font-bold text-gray-900 dark:text-white">{title}</h1>
            <Breadcrumb items={breadcrumbItems} />
        </>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    breadcrumbItems: PropTypes.array.isRequired,
};

export default Header;