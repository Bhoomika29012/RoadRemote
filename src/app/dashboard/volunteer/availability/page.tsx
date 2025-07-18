'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const skills = [
  { id: 'basic_repair', label: 'Basic Repair (e.g., loose wire)' },
  { id: 'towing_setup', label: 'Towing Preparation' },
  { id: 'fuel_delivery', label: 'Fuel Delivery' },
  { id: 'jump_start', label: 'Jump Start / Battery Help' },
  { id: 'tire_change', label: 'Tire Change' },
];

const tools = [
  { id: 'petrol_can', label: 'Petrol Can' },
  { id: 'jack', label: 'Car Jack' },
  { id: 'jumper_cables', label: 'Jumper Cables' },
  { id: 'basic_toolkit', label: 'Basic Toolkit' },
];

const availabilityFormSchema = z.object({
  availableFrom: z.string().min(1, { message: 'Please enter a start time.' }),
  availableTo: z.string().min(1, { message: 'Please enter an end time.' }),
  skills: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one skill.',
  }),
  tools: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one tool.',
  }),
});

type AvailabilityFormValues = z.infer<typeof availabilityFormSchema>;

const defaultValues: Partial<AvailabilityFormValues> = {
  skills: [],
  tools: [],
};

export default function AvailabilityForm() {
  const router = useRouter();
  const form = useForm<AvailabilityFormValues>({
    resolver: zodResolver(availabilityFormSchema),
    defaultValues,
  });

  function onSubmit(data: AvailabilityFormValues) {
    console.log(data);
    // In a real app, you'd save this to the backend.
    router.push('/dashboard/volunteer');
  }

  return (
    <div className="flex justify-center items-center w-full">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Set Your Availability</CardTitle>
          <CardDescription>
            Let us know when you're available and what you can help with. You can change this at any time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="availableFrom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Available From (e.g., 9:00 AM)</FormLabel>
                      <FormControl>
                        <Input placeholder="Time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="availableTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Available To (e.g., 5:00 PM)</FormLabel>
                      <FormControl>
                        <Input placeholder="Time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="skills"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Your Skills</FormLabel>
                      <FormDescription>Select all the skills you are confident in.</FormDescription>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {skills.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="skills"
                          render={({ field }) => (
                            <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item.id])
                                      : field.onChange(field.value?.filter((value) => value !== item.id));
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{item.label}</FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tools"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Your Tools</FormLabel>
                      <FormDescription>Select all the tools you have readily available.</FormDescription>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {tools.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="tools"
                          render={({ field }) => (
                            <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item.id])
                                      : field.onChange(field.value?.filter((value) => value !== item.id));
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{item.label}</FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                 <Button type="button" variant="outline" asChild>
                    <Link href="/dashboard/volunteer">Skip for now</Link>
                 </Button>
                <Button type="submit">Save Availability</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
