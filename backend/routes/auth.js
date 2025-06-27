const router = require("express").Router();
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

// ユーザー登録
router.post("/register", async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            }
        });
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// ログイン
router.post("/login", async (req, res) => {
    try {
        const user = await prisma.user.findUnique({ where: { email: req.body.email } });
        if (!user) return res.status(404).send("ユーザーが見つかりません");

        const validPassword = req.body.password === user.password;
        if (!validPassword) return res.status(400).json("パスワードが違います");

        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;