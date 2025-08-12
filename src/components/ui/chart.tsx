import React, { createContext, useContext, useMemo } from "react"
import {
  type TooltipProps
} from "recharts"
import {
  type NameType,
  type ValueType,
} from "recharts/types/component/DefaultTooltipContent"

// 1. ChartContext to share state between components
interface ChartContextProps {
  color?: string
  value?: number
  label?: string
}

const ChartContext = createContext<ChartContextProps>({
  color: "#000",
  value: 0,
  label: "",
})

export function useChart() {
  const context = useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a ChartContainer")
  }
  return context
}

// 2. ChartContainer component
export function ChartContainer({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const chart = useMemo(() => {
    return {
      color: "#8884d8", // Default color
      value: 0,
      label: "",
    }
  }, [])

  return (
    <ChartContext.Provider value={chart}>
      <div
        className={`w-full h-full ${className}`}
        {...props}
      >
        {children}
      </div>
    </ChartContext.Provider>
  )
}

// 3. ChartTooltip component
export function ChartTooltip({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) {
  if (active && payload && payload.length > 0) {
    const firstPayload = payload[0];
    
    // Explicitly check if the payload object exists before accessing its properties
    if (!firstPayload || !firstPayload.payload) {
      return null;
    }

    const data = firstPayload.payload; 
    const name = data.name || "Value";
    const value = data.value || 0;

    return (
      <div className="rounded-md border bg-background p-2 shadow-sm">
        <p className="text-sm font-bold text-foreground">{name}</p>
        <p className="text-sm text-muted-foreground">{`${value} responses`}</p>
      </div>
    );
  }

  return null;
}