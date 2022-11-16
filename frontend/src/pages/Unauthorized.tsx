import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion";

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <h1>Unauthorized</h1>
            <br />
            <p>You do not have access to the requested page.</p>
            <div className="flexGrow">
                <button onClick={goBack}>Go Back</button>
            </div>
        </motion.div>
    )
}

export default Unauthorized