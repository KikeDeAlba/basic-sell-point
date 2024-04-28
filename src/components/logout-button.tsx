export const LogoutButton = () => {
    return (
        <button
            onClick={() => {
                fetch("/api/auth/logout")
                    .then((res) => {
                        if (res.ok) {
                            window.location.href = "/";
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }}
            className="transition-all text-left duration-200 ease-in-out py-2 px-4 rounded-md text-black/80 hover:text-white hover:bg-black/80"
        >
            Cerrar sesion
        </button>
    )
}