import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat, Utensils } from "lucide-react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


 

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      console.log("Login attempted with:", { username, password });
    
  
      try {
 feature/landing-page
        const response = await fetch("https://api.vinaytrialdomain.fun/api/login", 
main
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          // Only navigate after confirming successful login
          navigate("/dashboard");
        } else {
          alert(data.error || "Invalid username or password");
        }
      } catch (error: any) {
        alert("Network error: " + error.message);
      }
    };


  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ChefHat className="h-8 w-8 text-primary" />
            <Utensils className="h-8 w-8 text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Recipe Discovery</h1>
          <p className="text-lg text-muted-foreground">
            Hi, Welcome to the path of healthier food and life. Please input your credentials below.
          </p>
        </div>

        <Card className="shadow-soft border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-foreground">Login</CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your credentials to access your recipe collection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12 bg-background/50 border-border focus:border-primary transition-colors"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-background/50 border-border focus:border-primary transition-colors"
                  required
                />
              </div>

              <Button 
                type="submit" 
                variant="gradient" 
                size="lg" 
                className="w-full h-12 text-base font-semibold"
              >
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;