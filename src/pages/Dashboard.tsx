import { ChefHat, Utensils, Construction } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ChefHat className="h-8 w-8 text-primary" />
            <Utensils className="h-8 w-8 text-accent" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Recipe Discovery</h1>
        </div>

        <Card className="shadow-soft border-0 bg-card/80 backdrop-blur-sm text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Construction className="h-16 w-16 text-accent" />
            </div>
            <CardTitle className="text-3xl text-foreground mb-4">
              Thanks for visiting!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Website is under construction. It will be up and running soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;