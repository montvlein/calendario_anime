'use client'
import { createContext, useContext } from 'react';

const CalendarContext = createContext();

export function useContextHook() {
  return useContext(CalendarContext);
}

export default CalendarContext;
