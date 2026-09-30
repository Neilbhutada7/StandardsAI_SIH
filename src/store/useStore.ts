import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { allStandards, initialAnalyses } from '../data/mockData';
import type { Analysis, ReviewDecision, Standard } from '../data/mockData';

interface AppState {
  standards: Standard[];
  analyses: Analysis[];
  addAnalysis: (analysis: Analysis) => void;
  updateReviewDecision: (analysisId: string, recommendationId: string, decision: ReviewDecision) => void;
  markAnalysisReviewed: (analysisId: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      standards: allStandards,
      analyses: initialAnalyses,
      addAnalysis: (analysis) =>
        set((state) => ({
          analyses: [analysis, ...state.analyses],
        })),
      updateReviewDecision: (analysisId, recommendationId, decision) =>
        set((state) => ({
          analyses: state.analyses.map((ana) => {
            if (ana.id === analysisId) {
              return {
                ...ana,
                recommendations: ana.recommendations.map((rec) =>
                  rec.id === recommendationId ? { ...rec, reviewerDecision: decision } : rec
                ),
              };
            }
            return ana;
          }),
        })),
      markAnalysisReviewed: (analysisId) =>
        set((state) => ({
          analyses: state.analyses.map((ana) =>
            ana.id === analysisId ? { ...ana, reviewStatus: 'Reviewed' } : ana
          ),
        })),
    }),
    {
      name: 'standards-ai-storage',
    }
  )
);
