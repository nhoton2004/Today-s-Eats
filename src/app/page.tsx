"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/header";
import BottomNav from "@/components/bottom-nav";
import HomeTab from "@/components/home-tab";
import ManagerTab from "@/components/manager-tab";
import FridgeTab from "@/components/fridge-tab";
import RecipeModal from "@/components/recipe-modal";
import { INITIAL_DISHES } from "@/lib/data";
import type { Dish, MealTypeId } from "@/lib/types";
import { recipeFromDish } from "@/ai/flows/recipe-from-dish";
import { suggestNewDishes } from "@/ai/flows/suggest-new-dishes";
import { suggestDishesFromIngredients } from "@/ai/flows/suggest-dishes-from-ingredients";
import { useToast } from "@/hooks/use-toast";

type ActiveTab = "home" | "fridge" | "manager";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [filter, setFilter] = useState<MealTypeId | "all">("all");
  const [result, setResult] = useState<Dish | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [newDishName, setNewDishName] = useState("");
  const [newDishType, setNewDishType] = useState<MealTypeId>("lunch");
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [recipeData, setRecipeData] = useState<string | null>(null);
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(false);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [fridgeIngredients, setFridgeIngredients] = useState("");
  const [fridgeSuggestions, setFridgeSuggestions] = useState<string | null>(null);
  const [isLoadingFridge, setIsLoadingFridge] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedDishes = localStorage.getItem("myMenu");
      if (savedDishes) {
        setDishes(JSON.parse(savedDishes));
      } else {
        setDishes(INITIAL_DISHES);
      }
    } catch (error) {
      console.error("Failed to load dishes from localStorage", error);
      setDishes(INITIAL_DISHES);
    }
  }, []);

  useEffect(() => {
    if (dishes.length > 0) {
      try {
        localStorage.setItem("myMenu", JSON.stringify(dishes));
      } catch (error) {
        console.error("Failed to save dishes to localStorage", error);
      }
    }
  }, [dishes]);

  const handleSpin = () => {
    const filteredDishes =
      filter === "all" ? dishes : dishes.filter((d) => d.type === filter);

    if (filteredDishes.length === 0) {
      toast({
        title: "Ôi không!",
        description: "Chưa có món nào trong danh mục này! Hãy thêm món mới nhé.",
        variant: "destructive",
      });
      return;
    }

    setIsSpinning(true);
    setResult(null);
    setRecipeData(null);

    let count = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * filteredDishes.length);
      setResult(filteredDishes[randomIndex]);
      count++;
      if (count > 15) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 100);
  };

  const handleAddDish = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!newDishName.trim()) return;
    const newDish = {
      id: Date.now(),
      name: newDishName,
      type: newDishType,
    };
    setDishes((prev) => [...prev, newDish]);
    setNewDishName("");
  };

  const handleDeleteDish = (id: number) => {
    setDishes(dishes.filter((d) => d.id !== id));
  };

  const handleReset = () => {
    setDishes(INITIAL_DISHES);
  };

  const handleGetRecipe = async () => {
    if (!result) return;
    setIsLoadingRecipe(true);
    setShowRecipeModal(true);
    setRecipeData(null);
    try {
      const res = await recipeFromDish({ dishName: result.name });
      setRecipeData(res.recipe || "AI đang bận nấu ăn mất rồi!");
    } catch (error) {
      console.error("AI Recipe Error:", error);
      setRecipeData("AI đang bận nấu ăn mất rồi! Thử lại sau nhé.");
      toast({ title: "Lỗi AI", description: "Không thể lấy công thức.", variant: "destructive" });
    } finally {
      setIsLoadingRecipe(false);
    }
  };

  const handleAISuggest = async () => {
    setIsSuggesting(true);
    try {
      const existingDishes = dishes.map((d) => d.name).join(", ");
      const { suggestions } = await suggestNewDishes({
        mealType: newDishType,
        existingDishes: existingDishes,
      });

      if (suggestions && suggestions.length > 0) {
        const newDishes = suggestions.map((name, index) => ({
          id: Date.now() + index,
          name: name,
          type: newDishType,
        }));
        setDishes((prev) => [...prev, ...newDishes]);
        toast({
          title: "Thêm thành công!",
          description: `Đã thêm ${suggestions.length} món mới vào thực đơn.`,
        });
      } else {
        toast({
          title: "Không có gợi ý mới",
          description: "AI không tìm thấy món nào phù hợp.",
        });
      }
    } catch (error) {
      console.error("AI Suggest Error:", error);
      toast({ title: "Lỗi AI", description: "Không thể nhận gợi ý.", variant: "destructive" });
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleFridgeCook = async () => {
    if (!fridgeIngredients.trim()) {
      toast({
        title: "Chờ đã!",
        description: "Bạn chưa nhập nguyên liệu nào cả.",
        variant: "destructive",
      });
      return;
    }
    setIsLoadingFridge(true);
    setFridgeSuggestions(null);

    try {
      const suggestions = await suggestDishesFromIngredients({
        ingredients: fridgeIngredients,
      });
      setFridgeSuggestions(
        suggestions ||
          "AI không nghĩ ra món nào, bạn thử nhập lại xem sao nhé!"
      );
    } catch (error) {
      console.error("Fridge Cook Error:", error);
      toast({ title: "Lỗi AI", description: "Không thể tìm món ăn.", variant: "destructive" });
      setFridgeSuggestions(
        "AI không nghĩ ra món nào, bạn thử nhập lại xem sao nhé!"
      );
    } finally {
      setIsLoadingFridge(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <HomeTab
            filter={filter}
            setFilter={setFilter}
            result={result}
            isSpinning={isSpinning}
            handleSpin={handleSpin}
            handleGetRecipe={handleGetRecipe}
          />
        );
      case "manager":
        return (
          <ManagerTab
            dishes={dishes}
            newDishName={newDishName}
            setNewDishName={setNewDishName}
            newDishType={newDishType}
            setNewDishType={setNewDishType}
            handleAddDish={handleAddDish}
            handleDeleteDish={handleDeleteDish}
            handleReset={handleReset}
            handleAISuggest={handleAISuggest}
            isSuggesting={isSuggesting}
          />
        );
      case "fridge":
        return (
          <FridgeTab
            fridgeIngredients={fridgeIngredients}
            setFridgeIngredients={setFridgeIngredients}
            isLoadingFridge={isLoadingFridge}
            handleFridgeCook={handleFridgeCook}
            fridgeSuggestions={fridgeSuggestions}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground pb-24">
      <Header />
      <main className="max-w-md mx-auto p-4 mt-2">
        {renderContent()}
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <RecipeModal
        showModal={showRecipeModal}
        setShowModal={setShowRecipeModal}
        isLoading={isLoadingRecipe}
        recipeData={recipeData}
        dishName={result?.name}
      />
    </div>
  );
}
