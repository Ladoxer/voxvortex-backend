export interface IAdminDashboardData {
  totalBlogs: number;
  totalLabels: number;
  totalUsers: number;
  trendingLabels: string[];
  trendingLabelsBlogCount: number[];
  premiumAndNormalUser: number[];
}

interface IDashboardService {
  getDashboardValues(): Promise<IAdminDashboardData>;
}

export default class DashboardService implements IDashboardService {

  async getDashboardValues(): Promise<IAdminDashboardData> {
    try {
      const totalBlogs = 3;
      const totalLabels = 9;
      const totalUsers = 5;
      const trendingLabels = ['angular', 'golang'];
      const trendingLabelsBlogCount = [2,1];
      const premiumAndNormalUser = [1,3];

      return {
        totalBlogs,
        totalLabels,
        totalUsers,
        trendingLabels,
        trendingLabelsBlogCount,
        premiumAndNormalUser
      }
    } catch (error) {
      throw error;
    }
  }
}