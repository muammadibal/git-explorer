"use client"
import { useThemeStore } from "@/store/theme";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { FloatButton } from 'antd';
import { PropsWithChildren } from "react";

export default function LayoutHome({children}: PropsWithChildren) {
    const {toggleTheme, theme} = useThemeStore()

    return (
        <div>
            {children}
            {/* <FloatButton onClick={toggleTheme} icon={theme === 'light' ? <MoonOutlined /> : <SunOutlined />}/> */}
        </div>
    )
}
