//React.HTMLAttributes<HTMLDivElement>.style?
const EditIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => {
    return (
        <div>
            <svg
                style={style}
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12.5 9.5C14.433 9.5 16 7.933 16 6C16 4.067 14.433 2.5 12.5 2.5C10.567 2.5 9 4.067 9 6C9 7.933 10.567 9.5 12.5 9.5Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M2.5 21C2.5 16.5817 6.52945 13 11.5 13"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M16 21.5L21 16.5L19 14.5L14 19.5V21.5H16Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
};

export default EditIcon;
