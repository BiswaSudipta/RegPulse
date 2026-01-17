import { RiskChart } from "@/components/dashboard/risk-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RiskDashboard } from "@/components/dashboard/risk-dashboard"

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                <p className="text-muted-foreground mt-2">Real-time compliance monitoring.</p>
            </div>

            <RiskDashboard />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Compliance Risk Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <RiskChart />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">AI Act Analysis</p>
                                    <p className="text-sm text-muted-foreground">Document analyzed successfully</p>
                                </div>
                                <div className="ml-auto font-medium text-sm text-muted-foreground">2m ago</div>
                            </div>
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">New Policy Uploaded</p>
                                    <p className="text-sm text-muted-foreground">GDPR Draft.pdf</p>
                                </div>
                                <div className="ml-auto font-medium text-sm text-muted-foreground">1h ago</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
