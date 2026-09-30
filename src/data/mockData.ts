export type StandardStatus = 'Current' | 'Under Review' | 'Historical';
export type Sector = 'Mechanical' | 'Electrical' | 'Civil/Construction' | 'PPE' | 'Chemical';
export type Relevance = 'High' | 'Medium' | 'Low';
export type ReviewDecision = 'Accept' | 'Review' | 'Reject' | null;

export interface Standard {
  id: string;
  number: string;
  title: string;
  sector: Sector;
  edition: string;
  status: StandardStatus;
  scope: string;
  evidenceExcerpt: string;
  relatedStandardIds: string[];
  normativeReferenceIds: string[];
}

export interface Recommendation {
  id: string;
  analysisId: string;
  standardId: string;
  relevance: Relevance;
  reasons: string[];
  relationshipType: string;
  reviewerDecision: ReviewDecision;
}

export interface Analysis {
  id: string;
  specificationText: string;
  category: Sector;
  extractedRequirements: string[];
  recommendedStandardIds: string[];
  reviewStatus: 'Pending' | 'Reviewed';
  createdAt: string;
  recommendations: Recommendation[]; // Inline for ease, or joined via analysisId
}

// Fixed core standards for explicit matching
export const coreStandards: Standard[] = [
  {
    id: 'std_IS_5120_2020',
    number: 'IS 5120:2020',
    title: 'Technical requirements for rotodynamic special purpose pumps',
    sector: 'Mechanical',
    edition: '2020',
    status: 'Current',
    scope: 'Covers the technical requirements for rotodynamic pumps for special applications.',
    evidenceExcerpt: 'Material specifications matching cast iron and bronze components for special purpose pumps.',
    relatedStandardIds: ['std_IS_1520_2000'],
    normativeReferenceIds: ['std_IS_210_2009']
  },
  {
    id: 'std_IS_1520_2000',
    number: 'IS 1520:2000',
    title: 'Horizontal Centrifugal Pumps for Clear, Cold, Fresh Water',
    sector: 'Mechanical',
    edition: '2000',
    status: 'Current',
    scope: 'This standard covers the requirements for horizontal centrifugal pumps for clear, cold, fresh water for agricultural and industrial applications.',
    evidenceExcerpt: 'The casing must be cast iron grade FG 200 minimum as per IS 210. Impeller material shall be bronze or stainless steel.',
    relatedStandardIds: ['std_IS_5120_2020'],
    normativeReferenceIds: ['std_IS_210_2009']
  },
  {
    id: 'std_IS_210_2009',
    number: 'IS 210:2009',
    title: 'Grey Iron Castings - Specification',
    sector: 'Mechanical',
    edition: '2009',
    status: 'Current',
    scope: 'Specifies requirements for grey iron castings used in general engineering purposes.',
    evidenceExcerpt: 'Specifies the grades of grey cast iron, including FG 200, based on tensile strength.',
    relatedStandardIds: [],
    normativeReferenceIds: []
  },
  {
    id: 'std_IS_694_2010',
    number: 'IS 694:2010',
    title: 'Polyvinyl Chloride Insulated Unsheathed-and Sheathed Cables/Cords',
    sector: 'Electrical',
    edition: '2010',
    status: 'Current',
    scope: 'Requirements for PVC insulated cables and cords.',
    evidenceExcerpt: 'Specifies copper conductor requirements and PVC insulation thickness.',
    relatedStandardIds: [],
    normativeReferenceIds: []
  },
  {
    id: 'std_IS_2925_1984',
    number: 'IS 2925:1984',
    title: 'Industrial Safety Helmets',
    sector: 'PPE',
    edition: '1984',
    status: 'Current',
    scope: 'Requirements regarding material, construction, workmanship and performance of industrial safety helmets.',
    evidenceExcerpt: 'Specifies shock absorption resistance and penetration resistance for safety helmets.',
    relatedStandardIds: [],
    normativeReferenceIds: []
  }
];

// Generate more to reach 40
const sectors: Sector[] = ['Mechanical', 'Electrical', 'Civil/Construction', 'PPE', 'Chemical'];
export const generatedStandards: Standard[] = Array.from({ length: 35 }).map((_, i) => ({
  id: `std_IS_${9000 + i}_2021`,
  number: `IS ${9000 + i}:2021`,
  title: `General specification for ${sectors[i % sectors.length].toLowerCase()} components part ${i}`,
  sector: sectors[i % sectors.length],
  edition: '2021',
  status: i % 5 === 0 ? 'Under Review' : 'Current',
  scope: 'This standard specifies requirements and testing methods for various industrial applications.',
  evidenceExcerpt: 'Contains generalized requirements for material safety and dimensional tolerances.',
  relatedStandardIds: [],
  normativeReferenceIds: []
}));

export const allStandards: Standard[] = [...coreStandards, ...generatedStandards];

// Generate 15 Analyses
export const initialAnalyses: Analysis[] = [
  {
    id: 'ANA-00128',
    specificationText: 'Centrifugal water pump intended for continuous industrial water circulation. Flow rate: Minimum 50 cubic meters per hour. Casing must be cast iron.',
    category: 'Mechanical',
    extractedRequirements: ['Continuous industrial water circulation', 'Flow rate: Minimum 50 cubic meters per hour', 'Pressure: 4 bar operating pressure', 'Cast iron casing, bronze/stainless steel impeller'],
    recommendedStandardIds: ['std_IS_1520_2000', 'std_IS_5120_2020', 'std_IS_210_2009'],
    reviewStatus: 'Pending',
    createdAt: '2026-09-27T10:00:00Z',
    recommendations: [
      { id: 'rec_1', analysisId: 'ANA-00128', standardId: 'std_IS_1520_2000', relevance: 'High', reasons: ['Product type matches', 'Application matches'], relationshipType: 'Primary Product Standard', reviewerDecision: null },
      { id: 'rec_2', analysisId: 'ANA-00128', standardId: 'std_IS_5120_2020', relevance: 'High', reasons: ['Testing requirements match'], relationshipType: 'Normative Reference', reviewerDecision: null },
      { id: 'rec_3', analysisId: 'ANA-00128', standardId: 'std_IS_210_2009', relevance: 'Medium', reasons: ['Material requirement match'], relationshipType: 'Related Standard', reviewerDecision: null }
    ]
  },
  {
    id: 'ANA-00127',
    specificationText: 'Procurement of copper conductor PVC insulated cables.',
    category: 'Electrical',
    extractedRequirements: ['Copper conductor', 'PVC insulation'],
    recommendedStandardIds: ['std_IS_694_2010'],
    reviewStatus: 'Pending',
    createdAt: '2026-09-26T14:30:00Z',
    recommendations: [
      { id: 'rec_4', analysisId: 'ANA-00127', standardId: 'std_IS_694_2010', relevance: 'High', reasons: ['Product match'], relationshipType: 'Primary Product Standard', reviewerDecision: null }
    ]
  },
  {
    id: 'ANA-00126',
    specificationText: 'Industrial safety helmets for construction workers.',
    category: 'PPE',
    extractedRequirements: ['Shock absorption', 'Penetration resistance'],
    recommendedStandardIds: ['std_IS_2925_1984'],
    reviewStatus: 'Reviewed',
    createdAt: '2026-09-25T09:15:00Z',
    recommendations: [
      { id: 'rec_5', analysisId: 'ANA-00126', standardId: 'std_IS_2925_1984', relevance: 'High', reasons: ['Application match'], relationshipType: 'Primary Product Standard', reviewerDecision: 'Accept' }
    ]
  },
  ...Array.from({ length: 12 }).map((_, i) => {
    const num = 125 - i;
    return {
      id: `ANA-00${num}`,
      specificationText: `General specification for ${sectors[i % sectors.length]} procurement ${i}.`,
      category: sectors[i % sectors.length],
      extractedRequirements: ['General requirement 1', 'General requirement 2'],
      recommendedStandardIds: [allStandards[5 + i].id],
      reviewStatus: (i % 2 === 0 ? 'Reviewed' : 'Pending') as 'Pending' | 'Reviewed',
      createdAt: new Date(Date.now() - (i + 3) * 86400000).toISOString(),
      recommendations: [
        { id: `rec_gen_${i}`, analysisId: `ANA-00${num}`, standardId: allStandards[5 + i].id, relevance: 'Medium' as Relevance, reasons: ['Keyword match'], relationshipType: 'Related', reviewerDecision: (i % 2 === 0 ? 'Accept' : null) as ReviewDecision }
      ]
    };
  })
];
