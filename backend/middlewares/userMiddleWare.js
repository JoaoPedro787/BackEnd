const userPostValidate = (req, res, next) => {
    try {
        const { UserName, Email, Password } = req.body;

        if (UserName === undefined || Email === undefined || Password === undefined) {
            return res.status(400).json({ message: "Entradas inválidas" });
        }

        if (UserName === '' || Email === '' || Password === '') {
            return res.status(400).json({ message: "Entradas vazias" });
        }

        next();
        
    } catch (err) {
        return res.status(500).json({ message: "Ocorreu um erro", error: err.message });
    }
};

module.exports = {
    userPostValidate,
};
