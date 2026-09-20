/**
 * Packs the timeline's company chips onto as few rows as possible.
 *
 * A chip sits under its year marker. Chips are wider than the year columns they
 * sit under, so some collide; a chip drops a row only when it genuinely cannot
 * sit beside its neighbour. With the current roles this settles on two rows.
 *
 * Widths are estimated rather than measured, because this runs at build time
 * with no layout engine. The estimate is deliberately packed against the
 * narrowest plot the horizontal axis is ever shown at, so the result holds
 * across the whole desktop range. On a wider screen the extra room is simply
 * slack, which is invisible; an overlap would not be.
 */

/** Narrowest plot the horizontal axis renders at, below which the vertical list takes over. */
const REFERENCE_PLOT = 920;
/** Horizontal padding on a chip, both sides together. */
const CHIP_PADDING = 20;
/** Clear space required between two chips on the same row. */
const GUTTER = 8;

/**
 * Approximate Inter advance widths at 14px. Capitals and the narrow letters
 * differ enough from the average that lumping them together misplaces a chip
 * by more than the gutter.
 */
export function textWidth(s: string): number {
  let px = 0;
  for (const ch of s) {
    if (ch === " ") px += 3.9;
    else if (/[A-Z]/.test(ch)) px += 9.4;
    else if (/[ijltf.,'&-]/.test(ch)) px += 4.6;
    else px += 7.4;
  }
  return px;
}

export interface ChipInput {
  /** Grid column of this chip's year marker, 1-based. */
  column: number;
  /** The text the chip actually renders. */
  label: string;
}

export interface ChipPlacement {
  row: number;
  /** Percentage across the plot, or null when the chip is pinned to the right edge. */
  left: number | null;
  /** True when the chip would have run past the right edge and was pinned instead. */
  pinnedRight: boolean;
}

export function packChips(chips: ChipInput[], columns: number): ChipPlacement[] {
  const columnWidth = REFERENCE_PLOT / columns;
  const rows: { start: number; end: number }[][] = [];
  const out: ChipPlacement[] = [];

  for (const chip of chips) {
    const width = textWidth(chip.label) + CHIP_PADDING;
    const marker = (chip.column - 1) * columnWidth;

    // A chip that would run past the right edge is pinned to it and grows
    // leftward instead. That is what keeps the 2015 pair inside the plot.
    const pinnedRight = marker + width > REFERENCE_PLOT;
    const start = pinnedRight ? REFERENCE_PLOT - width : marker;
    const end = start + width;

    let row = 0;
    while (rows[row]?.some((c) => start < c.end + GUTTER && end + GUTTER > c.start)) row++;
    (rows[row] ??= []).push({ start, end });

    out.push({
      row,
      left: pinnedRight ? null : ((chip.column - 1) / columns) * 100,
      pinnedRight,
    });
  }

  return out;
}
