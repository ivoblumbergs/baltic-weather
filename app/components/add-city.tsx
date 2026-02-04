import { useState } from "react";
import { Form, useNavigation } from "react-router"; // RR7 Form
import { Loader2, Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export function AddCityDialog() {
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // Close city dialog after submission

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-brand-orange hover:bg-orange-600 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Pievienot Pilsētu
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-[95%] max-h-[90vh] overflow-y-auto top-[20%] translate-y-0 sm:top-[50%] sm:-translate-y-1/2">
        <DialogHeader>
          <DialogTitle>Pievienot Jaunu Pilsētu</DialogTitle>
          <DialogDescription>
            Ievadiet pilsētas nosaukumu (angliski), lai iegūtu datus.
          </DialogDescription>
        </DialogHeader>

        {/* Submits current action */}
        <Form method="post" onSubmit={() => setOpen(false)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right">
                Pilsēta
              </Label>
              <Input
                id="city"
                name="cityName"
                placeholder="Riga"
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Saglabāt
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
