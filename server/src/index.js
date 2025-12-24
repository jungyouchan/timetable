import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from "crypto";
import argon2 from 'argon2';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

// 🔹 Vite build 결과 경로
const clientDistPath = path.join(__dirname, '../client/dist');


app.use(express.static(clientDistPath));
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/login', async(req, res) => {
    const { name, password } = req.body;
    //DB에서 확인
})

app.post('/api/signup', async(req, res) => {
    console.log(req.body);
    const { name, password, role } = req.body;
    let userId;
    //DB에 저장

    try {
        userId = randomUUID();
        const hashedPassword = await argon2.hash(password, {
            type: argon2.argon2id,
            timeCost: 4,
            memoryCost: 131072,
            parallelism: 1,
        });

        // users 테이블
        const { error: userError } = await supabase
            .from("users")
            .insert({
                id: userId,
                role,
                name,
                password_hash: hashedPassword,
            });

        if (userError) throw userError;

        // 역할별 테이블
        if (role === "student") {
            const { error } = await supabase
                .from("students")
                .insert({ id: userId });
            if (error) throw error;
        }

        if (role === "teacher") {
            const { error } = await supabase
                .from("teachers")
                .insert({ id: userId });
            if (error) throw error;
        }

        return res.json({ success: true });
    } catch (err) {
        console.error('Signup error:', err);
        if (userId) {
            await supabase.from(`${role}s`).delete().eq("id", userId);
            await supabase.from("users").delete().eq("id", userId);
        }
        return res.status(500).json({
            success: false,
            message: '회원가입 중 서버 오류가 발생했습니다.'
        });
    }

})

// 🔹 API 말고 나머지는 index.html로
app.get('*', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});