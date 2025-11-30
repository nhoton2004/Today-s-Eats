"use client";

import { Refrigerator, Sparkles, ChefHat, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface FridgeTabProps {
  fridgeIngredients: string;
  setFridgeIngredients: (ingredients: string) => void;
  isLoadingFridge: boolean;
  handleFridgeCook: () => void;
  fridgeSuggestions: string | null;
}

export default function FridgeTab({
  fridgeIngredients, setFridgeIngredients, isLoadingFridge, handleFridgeCook, fridgeSuggestions
}: FridgeTabProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-blue-50/50 border-blue-100 rounded-3xl">
        <CardContent className="p-6 text-center">
          <Refrigerator size={48} className="mx-auto text-blue-400 mb-2" />
          <h2 className="text-2xl font-bold text-blue-600 mb-1">Tủ Lạnh Thông Minh</h2>
          <p className="text-sm text-blue-500 mb-4">Nhập nguyên liệu bạn có, AI sẽ nghĩ món giúp bạn!</p>
          
          <Textarea 
            value={fridgeIngredients}
            onChange={(e) => setFridgeIngredients(e.target.value)}
            placeholder="VD: 4 quả trứng, 1 mớ hành, cà chua, cơm nguội..."
            className="w-full p-4 rounded-xl border-blue-200 focus:ring-2 focus:ring-blue-400 min-h-[100px] text-gray-700 mb-4 bg-white"
          />
          
          <Button
            onClick={handleFridgeCook}
            disabled={isLoadingFridge}
            className="w-full h-auto py-3 rounded-xl font-bold text-white shadow-lg transition-all bg-blue-500 hover:bg-blue-600 shadow-blue-200 disabled:bg-blue-300 disabled:shadow-none"
          >
            {isLoadingFridge ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
            {isLoadingFridge ? 'Đang suy nghĩ...' : 'Tìm Món Ngon Ngay'}
          </Button>
        </CardContent>
      </Card>

      {isLoadingFridge && !fridgeSuggestions && (
        <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-6">
          <Loader2 className="animate-spin h-8 w-8 mb-2" />
          <p>Bếp trưởng AI đang lục tủ lạnh...</p>
        </div>
      )}

      {fridgeSuggestions && (
        <Card className="shadow-lg border-blue-100 rounded-3xl animate-fade-in">
          <CardContent className="p-6">
            <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
              <ChefHat className="text-orange-500"/> Gợi ý từ Bếp Trưởng:
            </h3>
            <div className="whitespace-pre-line leading-relaxed text-gray-700 text-sm">
              {fridgeSuggestions.split('\n').map((line, index) => {
                if (line.startsWith('Món')) {
                  return <p key={index} className="font-bold text-base text-primary mt-4 mb-1">{line}</p>
                }
                if (line.startsWith('-')) {
                  return <p key={index} className="pl-2">{line}</p>
                }
                return <p key={index}>{line}</p>
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
