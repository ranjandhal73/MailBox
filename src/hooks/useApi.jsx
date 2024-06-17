import toast from "react-hot-toast"

const useApi = () =>{

    const onSend = async (url, message) =>{
        try {
            const response = await fetch(`${url}`,{
                method: 'POST',
                body: JSON.stringify(message),
                headers: {
                    'Content-Type': 'application.json'
                }
            })
            if(!response.ok){
                const err = await response.json();
                throw new Error(err.message);
            }
            const data = await response.json()
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const onDelete = async (url) =>{
        try {
            const response = await fetch(url,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application.json'
                }
            })
            if(!response.ok){
                const err = await response.json();
                throw new Error(err.message);
            }

            const data = await response.json();
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    return {onSend, onDelete};
};

export default useApi;