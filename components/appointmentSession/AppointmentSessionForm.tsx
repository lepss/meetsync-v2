"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { z } from "zod";
import { ImageUpload } from "../ui/ImageUpload";

interface CloudinaryResponse {
  public_id: string;
  secure_url: string;
}

const FormSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().max(500),
  image: z.string().max(500),
});

export type AppointmentSessionFormType = z.infer<typeof FormSchema>;

type AppointmentSessionFormProps = {
  onSubmit: (values: AppointmentSessionFormType) => Promise<string | void>;
};

export const AppointmentSessionForm = ({
  onSubmit,
}: AppointmentSessionFormProps) => {
  const form = useZodForm({
    schema: FormSchema,
    defaultValues: {
      name: "",
      description: "",
      image: "",
    },
  });
  const [imageFormData, setImageFormData] = useState<FormData | null>(null);

  const router = useRouter();

  const handleFormDataReady = useCallback((formData: FormData | null) => {
    setImageFormData(formData);
  }, []);

  return (
    <Form
      className="space-y-4"
      form={form}
      onSubmit={async (values) => {
        if (imageFormData) {
          try {
            imageFormData.append("upload_preset", "vp7zprgo");

            const response = await axios.post<CloudinaryResponse>(
              `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
              imageFormData
            );

            values.image = response.data.secure_url;

            const submitResponse = await onSubmit(values);
            if (submitResponse) {
              router.push(submitResponse);
            }
          } catch (error) {
            console.error("Error uploading image:", error);
          }
        }
      }}
    >
      {" "}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Session Name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Description of the session" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Picture</FormLabel>
            <FormControl>
              <ImageUpload onFormDataReady={handleFormDataReady} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex w-full justify-end">
        <Button size="sm">Post</Button>
      </div>
    </Form>
  );
};
