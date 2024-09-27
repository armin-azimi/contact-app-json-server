
import './Header.css'; 

const Header = ({ onClear, onSearch }) => {
    const handleSearchChange = (e) => {
        onSearch(e.target.value);
    };

    return (
        <div className="header">
            <h2>Contact App</h2>
            <input 
                type="text" 
                placeholder="Search by Name, Email, or Number"
                onChange={handleSearchChange} 
            />
            <button onClick={onClear}>Clear Contacts</button>
        </div>
    );
};

export default Header;
