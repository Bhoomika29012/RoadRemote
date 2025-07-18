import Link from 'next/link';
import { Car, Wrench, HeartHandshake, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-background/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 border-b">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Car className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-bold font-headline">RoadRescue</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Features
          </Link>
          <Link href="#roles" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Get Started
          </Link>
          <Button asChild variant="outline" size="sm">
            <Link href="/auth?role=driver" prefetch={false}>Login</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        <section className="w-full pt-24 md:pt-32 lg:pt-40 border-b">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] font-headline">
                  Stranded? Get reliable roadside assistance, fast.
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
                  RoadRescue connects you with nearby volunteers and professional garages to get you back on the road in no time.
                </p>
                <div className="space-x-4 mt-6">
                  <Button asChild size="lg">
                    <Link href="/auth?role=driver" prefetch={false}>
                      Request Help Now
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="https://placehold.co/600x400.png"
                  alt="Hero"
                  data-ai-hint="roadside assistance car"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="roles" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Get Started</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">How can we help you?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Whether you're a driver in need, a garage ready to assist, or a volunteer willing to help, select your role to begin.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3 mt-12">
              <RoleCard
                icon={<Car className="h-8 w-8 text-primary" />}
                title="I'm a Driver"
                description="My vehicle broke down. I need immediate assistance from a nearby professional or volunteer."
                link="/auth?role=driver"
                actionText="Request Help"
              />
              <RoleCard
                icon={<Wrench className="h-8 w-8 text-primary" />}
                title="I'm a Garage"
                description="I'm a professional mechanic or tow service looking to find and accept jobs in my area."
                link="/auth?role=garage"
                actionText="Find Jobs"
              />
              <RoleCard
                icon={<HeartHandshake className="h-8 w-8 text-primary" />}
                title="I'm a Volunteer"
                description="I have the skills and tools to help others with basic car troubles. I want to lend a hand."
                link="/auth?role=volunteer"
                actionText="Become a Hero"
              />
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
                Peace of Mind, Mile After Mile
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform is designed for speed, reliability, and safety. Here’s what makes RoadRescue the best choice.
              </p>
            </div>
            <div className="flex space-x-4 lg:justify-end">
              <div className="grid gap-6">
                <FeatureItem
                  icon={<ShieldCheck className="h-8 w-8 text-primary" />}
                  title="Verified Helpers"
                  description="All garages and volunteers are vetted to ensure you get safe and reliable help."
                />
                <FeatureItem
                  icon={<Car className="h-8 w-8 text-primary" />}
                  title="Real-Time Tracking"
                  description="Watch your helper's approach on a live map, so you know exactly when they'll arrive."
                />
                 <FeatureItem
                  icon={<Wrench className="h-8 w-8 text-primary" />}
                  title="Clear Communication"
                  description="In-app chat lets you communicate directly with your assigned helper for seamless coordination."
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 RoadRescue. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function RoleCard({ icon, title, description, link, actionText }: { icon: React.ReactNode, title: string, description: string, link: string, actionText: string }) {
  return (
    <Card className="flex flex-col justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <CardHeader className="flex flex-row items-center gap-4 pb-4">
        {icon}
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <div className="p-6 pt-0">
        <Button asChild className="w-full">
          <Link href={link} prefetch={false}>{actionText}</Link>
        </Button>
      </div>
    </Card>
  );
}

function FeatureItem({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="bg-primary/10 p-3 rounded-full">
       {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}