"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadialBarChart, RadialBar, ResponsiveContainer, AreaChart, Area, Tooltip, YAxis } from "recharts"
import { motion } from "framer-motion"
import { ShieldAlert, ShieldCheck, Zap } from "lucide-react"

const complianceData = [
    {
        name: "Compliance",
        uv: 85,
        fill: "#10b981",
    },
]

const velocityData = [
    { name: "Mon", uv: 400 },
    { name: "Tue", uv: 300 },
    { name: "Wed", uv: 500 },
    { name: "Thu", uv: 280 },
    { name: "Fri", uv: 590 },
    { name: "Sat", uv: 350 },
    { name: "Sun", uv: 600 },
]

export function RiskDashboard() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* 1. Total Compliance Score */}
            <Card className="bg-white/[0.03] backdrop-blur border-none text-white shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Total Compliance Score</CardTitle>
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                    <div className="h-[120px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" barSize={10} data={complianceData} startAngle={90} endAngle={-270}>
                                <RadialBar
                                    background
                                    // @ts-ignore
                                    clockWise
                                    dataKey="uv"
                                    cornerRadius={10}
                                />
                                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-white text-2xl font-bold">
                                    85%
                                </text>
                            </RadialBarChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-xs text-center text-gray-500 mt-2">Top 5% in sector</p>
                </CardContent>
            </Card>

            {/* 2. Active Risks */}
            <Card className="bg-white/[0.03] backdrop-blur border-none text-white shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Active Risks</CardTitle>
                    <ShieldAlert className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm">GDPR Data Flow</span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/20 text-red-400 border border-red-500/20">HIGH</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm">API Rate Limit</span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-yellow-500/20 text-yellow-400 border border-yellow-500/20">MED</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm">Audit Log Gap</span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-400 border border-blue-500/20">LOW</span>
                    </div>
                </CardContent>
            </Card>

            {/* 3. Regulatory Velocity */}
            <Card className="bg-white/[0.03] backdrop-blur border-none text-white shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Regulatory Velocity</CardTitle>
                    <Zap className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                    <div className="h-[80px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={velocityData}>
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">+12% increase in alerts</p>
                </CardContent>
            </Card>

            {/* 4. System Status */}
            <Card className="bg-white/[0.03] backdrop-blur border-none text-white shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">System Status</CardTitle>
                    <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center h-[120px] space-y-2">
                    <motion.div
                        className="w-16 h-16 rounded-full border-4 border-emerald-500/30 flex items-center justify-center"
                        animate={{
                            boxShadow: ["0 0 0 0 rgba(16, 185, 129, 0)", "0 0 0 20px rgba(16, 185, 129, 0)"],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                        }}
                    >
                        <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <span className="text-xs font-bold text-emerald-400">OK</span>
                        </div>
                    </motion.div>
                    <p className="text-xs text-emerald-400 font-medium tracking-wider">OPERATIONAL</p>
                </CardContent>
            </Card>
        </div>
    )
}
