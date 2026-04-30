def knapsack_roadmap(skills, available_hours):
    """
    0/1 Knapsack algorithm to select the highest-demand skills
    that fit within the user's available study hours.

    Args:
        skills (list[dict]): Each dict has 'name', 'demand_score', 'estimated_hours'.
        available_hours (int): Total hours the user can study.

    Returns:
        list[dict]: Ordered list of selected skills with allocated hours.
    """
    n = len(skills)
    capacity = available_hours

    # Build DP table
    dp = [[0.0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        skill = skills[i - 1]
        weight = skill["estimated_hours"]
        value = skill["demand_score"]
        for w in range(capacity + 1):
            dp[i][w] = dp[i - 1][w]
            if weight <= w:
                dp[i][w] = max(dp[i][w], dp[i - 1][w - weight] + value)

    # Backtrack to find selected skills
    selected = []
    w = capacity
    for i in range(n, 0, -1):
        if dp[i][w] != dp[i - 1][w]:
            selected.append(skills[i - 1])
            w -= skills[i - 1]["estimated_hours"]

    # Sort by demand score descending (highest priority first)
    selected.sort(key=lambda s: s["demand_score"], reverse=True)

    result = []
    for order, skill in enumerate(selected, start=1):
        result.append({
            "name": skill["name"],
            "demand_score": skill["demand_score"],
            "estimated_hours": skill["estimated_hours"],
            "allocated_hours": skill["estimated_hours"],
            "order": order,
        })

    return result
