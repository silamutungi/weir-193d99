export type RiskLevel = 'high' | 'medium' | 'low'

export type ActionType = 'takedown' | 'monetize' | 'approve' | 'pending'

export interface NilMatch {
  id: string
  user_id: string
  platform: string
  url: string
  title: string
  description: string
  risk_level: RiskLevel
  action: ActionType
  estimated_revenue: number
  detected_at: string
  created_at: string
  deleted_at: string | null
}

export interface UserProfile {
  id: string
  user_id: string
  display_name: string
  protection_score: number
  monthly_earnings: number
  total_matches: number
  created_at: string
  deleted_at: string | null
}

export interface LicenseTier {
  id: string
  user_id: string
  tier: 'restricted' | 'balanced' | 'open'
  social_media: boolean
  news: boolean
  commercial: boolean
  ai_generated: boolean
  cpm_rate: number
  created_at: string
  deleted_at: string | null
}
