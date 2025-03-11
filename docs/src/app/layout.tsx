import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "abstract-rhf",
	description: "A library for building forms with React-Hook-Form",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					geistSans.variable,
					geistMono.variable,
					"font-sans bg-background text-foreground antialiased",
				)}
			>
				{/* <base href="http://localhost:3000/" /> */}
				{children}
			</body>
		</html>
	);
}
