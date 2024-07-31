
import { isOfferOwnerOrAdmin, isUserOrAdmin } from "@/services/check-authorization";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { describe, expect, it } from "@jest/globals";

jest.mock("@/lib/authOptions", () => ({
  authOptions: {
    adapter: {},
    providers: [],
    callbacks: {},
  },
}));

jest.mock("next-auth/next", () => ({
  getServerSession: jest.fn(),
}));

let mockedSession = null;

describe("Authorization functions", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("isOfferOwnerOrAdmin", () => {
    it("should return true if user is admin", async () => {
      mockedSession = { user: { roleId: 1, id: 2 } };
      (getServerSession as jest.Mock).mockResolvedValue(mockedSession);

      const result = await isOfferOwnerOrAdmin(3);
      expect(result).toBe(true);
    });

    it("should return true if user is the offer mentor", async () => {
      mockedSession = { user: { roleId: 2, id: 3 } };
      (getServerSession as jest.Mock).mockResolvedValue(mockedSession);

      const result = await isOfferOwnerOrAdmin(3);
      expect(result).toBe(true);
    });

    it("should return false if user is neither admin nor offer mentor", async () => {
      mockedSession = { user: { roleId: 2, id: 4 } };
      (getServerSession as jest.Mock).mockResolvedValue(mockedSession);

      const result = await isOfferOwnerOrAdmin(3);
      expect(result).toBe(false);
    });
  });

  describe("isUserOrAdmin", () => {
    it("should return true if user is admin", async () => {
      mockedSession = { user: { roleId: 1, id: 2 } };
      (getServerSession as jest.Mock).mockResolvedValue(mockedSession);

      const result = await isUserOrAdmin(3);
      expect(result).toBe(true);
    });

    it("should return true if user is the same user", async () => {
      mockedSession = { user: { roleId: 2, id: 3 } };
      (getServerSession as jest.Mock).mockResolvedValue(mockedSession);

      const result = await isUserOrAdmin(3);
      expect(result).toBe(true);
    });

    it("should return false if user is neither admin nor the same user", async () => {
      mockedSession = { user: { roleId: 2, id: 4 } };
      (getServerSession as jest.Mock).mockResolvedValue(mockedSession);

      const result = await isUserOrAdmin(3);
      expect(result).toBe(false);
    });
  });
});
