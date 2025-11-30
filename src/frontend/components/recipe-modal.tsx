"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/frontend/components/ui/dialog';
import { Button } from '@/frontend/components/ui/button';
import { Loader2, Sparkles, X } from 'lucide-react';

interface RecipeModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  isLoading: boolean;
  recipeData: string | null;
  dishName?: string;
}

export default function RecipeModal({ showModal, setShowModal, isLoading, recipeData, dishName }: RecipeModalProps) {
  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="max-w-md w-full p-0 gap-0 rounded-3xl overflow-hidden">
        <DialogHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 text-primary-foreground flex flex-row justify-between items-center space-y-0">
          <DialogTitle className="flex items-center gap-2 text-lg text-primary-foreground">
            <Sparkles size={20} className="text-yellow-300" />
            Góc Bếp AI
          </DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20 h-8 w-8">
              <X size={24} />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        
        <div className="p-6 overflow-y-auto custom-scrollbar max-h-[60vh]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-4">
              <Loader2 size={40} className="animate-spin text-purple-500" />
              <p className="text-muted-foreground text-sm animate-pulse">Đang tra cứu công thức bí truyền...</p>
            </div>
          ) : (
            <div className="space-y-4 text-sm leading-relaxed text-gray-700">
              <h4 className="text-xl font-bold text-foreground font-headline">{dishName}</h4>
              <div className="whitespace-pre-line">
                {recipeData}
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 bg-secondary/50 border-t">
          <Button 
            onClick={() => setShowModal(false)}
            variant="secondary"
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 h-auto rounded-xl transition"
          >
            Đã hiểu, cảm ơn AI!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
