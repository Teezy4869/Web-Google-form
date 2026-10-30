# scratch/purge_dead_css.py
import sys

def purge():
    with open("src/styles/index.css", "r", encoding="utf-8") as f:
        lines = f.readlines()

    # Find start and end
    start_idx = -1
    end_idx = -1
    for i, line in enumerate(lines):
        if ".mission-spotlight-card {" in line:
            start_idx = i
        if ".pillar-desc {" in line:
            # The block ends after this rule (approx 5 lines down)
            for j in range(i, i + 10):
                if lines[j].strip() == "}":
                    end_idx = j + 1
                    break

    if start_idx != -1 and end_idx != -1:
        print(f"Purging lines {start_idx+1} to {end_idx}...")
        del lines[start_idx:end_idx]
        with open("src/styles/index.css", "w", encoding="utf-8") as f:
            f.writelines(lines)
        print("Dead CSS successfully purged.")
    else:
        print(f"Error: could not find indices ({start_idx}, {end_idx})")

if __name__ == "__main__":
    purge()

