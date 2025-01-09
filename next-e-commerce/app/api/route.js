import { NextResponse } from "next/server";

export async function GET(req) {
    return NextResponse.json({time: new Date().toLocaleString() });
}


//mongodb+srv://nxus:Ba3hBJugekwxkhmR@cluster0.zgmij.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0